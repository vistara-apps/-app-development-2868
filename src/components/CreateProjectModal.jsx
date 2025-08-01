import React, { useState } from 'react'
import { X, Upload, AlertCircle } from 'lucide-react'
import { useUser } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { validateImageFile, createImagePreview, cleanupImagePreview } from '../utils/imageUtils.js'

const CreateProjectModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    roomType: '',
    length: '',
    width: '',
    height: '',
    description: ''
  })
  const [selectedFiles, setSelectedFiles] = useState([])
  const [fileErrors, setFileErrors] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])
  const { createProject } = useUser()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Clean up preview URLs
    previewUrls.forEach(url => cleanupImagePreview(url))
    
    const project = createProject({
      ...formData,
      roomDimensions: {
        length: parseFloat(formData.length),
        width: parseFloat(formData.width),
        height: parseFloat(formData.height)
      },
      roomPhotos: selectedFiles.map(file => file.name),
      roomPhotoFiles: selectedFiles // Store actual file objects for AI analysis
    })
    onClose()
    navigate(`/projects/${project.id}`)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = []
    const errors = []
    const newPreviewUrls = []

    files.forEach((file, index) => {
      const validation = validateImageFile(file, 10) // 10MB limit
      if (validation.isValid) {
        validFiles.push(file)
        newPreviewUrls.push(createImagePreview(file))
      } else {
        errors.push(`${file.name}: ${validation.errors.join(', ')}`)
      }
    })

    // Clean up old preview URLs
    previewUrls.forEach(url => cleanupImagePreview(url))

    setSelectedFiles(validFiles)
    setFileErrors(errors)
    setPreviewUrls(newPreviewUrls)
  }

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    const newPreviews = previewUrls.filter((_, i) => i !== index)
    
    // Clean up the removed preview URL
    cleanupImagePreview(previewUrls[index])
    
    setSelectedFiles(newFiles)
    setPreviewUrls(newPreviews)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., Living Room Redesign"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Type
            </label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select room type</option>
              <option value="Living Room">Living Room</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Bathroom">Bathroom</option>
              <option value="Office">Office</option>
              <option value="Dining Room">Dining Room</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length (ft)
              </label>
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
                className="input-field"
                placeholder="12"
                step="0.1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Width (ft)
              </label>
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleChange}
                className="input-field"
                placeholder="10"
                step="0.1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (ft)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="input-field"
                placeholder="9"
                step="0.1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Room Photos (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
              <div className="text-sm text-gray-600 mb-2">
                {selectedFiles.length > 0 
                  ? `${selectedFiles.length} file(s) selected`
                  : 'Click to upload or drag and drop multiple photos'
                }
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-primary-600 hover:text-primary-700"
              >
                Browse Files
              </label>
              <p className="text-xs text-gray-500 mt-2">
                JPEG, PNG, WebP up to 10MB each. Multiple photos help AI generate better layouts.
              </p>
            </div>

            {/* File Errors */}
            {fileErrors.length > 0 && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800">File Upload Errors</h4>
                    <ul className="text-sm text-red-700 mt-1 space-y-1">
                      {fileErrors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* File Previews */}
            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Photos</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={previewUrls[index]}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate">
                        {file.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field"
              rows="3"
              placeholder="Describe any specific requirements, challenges, or preferences..."
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProjectModal
