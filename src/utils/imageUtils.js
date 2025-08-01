// Image processing utilities for room photo analysis

/**
 * Convert a File object to base64 string
 * @param {File} file - The image file to convert
 * @returns {Promise<string>} Base64 encoded image string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'))
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      // Remove the data URL prefix to get just the base64 string
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Resize image to reduce API costs while maintaining quality
 * @param {File} file - The image file to resize
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} maxHeight - Maximum height in pixels
 * @param {number} quality - JPEG quality (0-1)
 * @returns {Promise<Blob>} Resized image blob
 */
export const resizeImage = (file, maxWidth = 1024, maxHeight = 1024, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Failed to create blob'))
          }
        },
        'image/jpeg',
        quality
      )
    }

    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Validate image file type and size
 * @param {File} file - The file to validate
 * @param {number} maxSizeMB - Maximum file size in MB
 * @returns {Object} Validation result
 */
export const validateImageFile = (file, maxSizeMB = 10) => {
  const errors = []
  
  if (!file) {
    errors.push('No file provided')
    return { isValid: false, errors }
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    errors.push('File must be a JPEG, PNG, or WebP image')
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    errors.push(`File size must be less than ${maxSizeMB}MB`)
  }

  return {
    isValid: errors.length === 0,
    errors,
    fileInfo: {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }
  }
}

/**
 * Extract image metadata for analysis
 * @param {File} file - The image file
 * @returns {Promise<Object>} Image metadata
 */
export const extractImageMetadata = async (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    
    img.onload = () => {
      const metadata = {
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight,
        size: file.size,
        type: file.type,
        name: file.name
      }
      
      URL.revokeObjectURL(img.src) // Clean up
      resolve(metadata)
    }
    
    img.onerror = () => {
      URL.revokeObjectURL(img.src)
      reject(new Error('Failed to load image for metadata extraction'))
    }
    
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Prepare image for AI analysis
 * @param {File} file - The image file
 * @returns {Promise<Object>} Prepared image data
 */
export const prepareImageForAI = async (file) => {
  try {
    // Validate the file
    const validation = validateImageFile(file)
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '))
    }

    // Extract metadata
    const metadata = await extractImageMetadata(file)

    // Resize if necessary to optimize for AI processing
    const shouldResize = metadata.width > 1024 || metadata.height > 1024 || file.size > 2 * 1024 * 1024
    const processedFile = shouldResize ? await resizeImage(file) : file

    // Convert to base64
    const base64 = await fileToBase64(processedFile)

    return {
      base64,
      metadata: {
        ...metadata,
        processed: shouldResize,
        finalSize: processedFile.size || file.size
      }
    }
  } catch (error) {
    throw new Error(`Failed to prepare image for AI analysis: ${error.message}`)
  }
}

/**
 * Create a preview URL for an image file
 * @param {File} file - The image file
 * @returns {string} Object URL for preview
 */
export const createImagePreview = (file) => {
  return URL.createObjectURL(file)
}

/**
 * Clean up preview URL
 * @param {string} url - The object URL to revoke
 */
export const cleanupImagePreview = (url) => {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url)
  }
}

