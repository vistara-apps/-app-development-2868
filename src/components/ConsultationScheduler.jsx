import React, { useState } from 'react'
import { Calendar, Clock, Video, User, Star, MessageSquare } from 'lucide-react'

const ConsultationScheduler = ({ project }) => {
  const [selectedDesigner, setSelectedDesigner] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [consultationType, setConsultationType] = useState('video')

  const designers = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      specialty: 'Modern & Contemporary',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 85,
      image: 'https://images.unsplash.com/photo-1494790108755-2616c1340999?w=150&h=150&fit=crop&crop=face',
      bio: 'Specialized in creating functional modern spaces with 8+ years of experience.',
      nextAvailable: '2024-01-15'
    },
    {
      id: 2,
      name: 'James Rodriguez',
      specialty: 'Traditional & Classic',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 75,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Expert in traditional design with focus on timeless elegance and comfort.',
      nextAvailable: '2024-01-16'
    },
    {
      id: 3,
      name: 'Emily Chen',
      specialty: 'Minimalist & Scandinavian',
      rating: 4.9,
      reviews: 156,
      hourlyRate: 90,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Creates serene, clutter-free spaces that maximize both beauty and functionality.',
      nextAvailable: '2024-01-14'
    }
  ]

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ]

  const handleScheduleConsultation = () => {
    if (!selectedDesigner || !selectedDate || !selectedTime) {
      alert('Please select a designer, date, and time slot.')
      return
    }

    alert(`Consultation scheduled with ${selectedDesigner.name} on ${selectedDate} at ${selectedTime}`)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Virtual Design Consultation</h2>
            <p className="text-gray-600">
              Get personalized advice from professional designers to refine your space
            </p>
          </div>
          <div className="text-primary-600">
            <MessageSquare className="w-12 h-12" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">What's Included</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• 60-minute video consultation</li>
              <li>• Personalized design advice</li>
              <li>• Layout refinement suggestions</li>
              <li>• Color & style guidance</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Consultation Types</h4>
            <ul className="text-green-800 text-sm space-y-1">
              <li>• Live video call</li>
              <li>• Screen sharing included</li>
              <li>• Follow-up summary report</li>
              <li>• Revision recommendations</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">After Your Call</h4>
            <ul className="text-purple-800 text-sm space-y-1">
              <li>• Detailed action plan</li>
              <li>• Updated project notes</li>
              <li>• Shopping list updates</li>
              <li>• Follow-up support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Consultation Type Selection */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Select Consultation Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setConsultationType('video')}
            className={`p-4 rounded-lg border-2 transition-all ${
              consultationType === 'video' 
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Video className="w-8 h-8 text-primary-600" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Video Consultation</h4>
                <p className="text-sm text-gray-600">Interactive 1-on-1 video call</p>
                <p className="text-sm font-medium text-primary-600">Most Popular</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => setConsultationType('phone')}
            className={`p-4 rounded-lg border-2 transition-all ${
              consultationType === 'phone' 
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-8 h-8 text-primary-600" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Phone Consultation</h4>
                <p className="text-sm text-gray-600">Voice call with shared materials</p>
                <p className="text-sm font-medium text-green-600">Available Now</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Designer Selection */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Choose Your Designer</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {designers.map((designer) => (
            <div
              key={designer.id}
              className={`border-2 rounded-lg p-6 transition-all cursor-pointer ${
                selectedDesigner?.id === designer.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedDesigner(designer)}
            >
              <div className="text-center mb-4">
                <img
                  src={designer.image}
                  alt={designer.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3"
                />
                <h4 className="font-semibold text-gray-900">{designer.name}</h4>
                <p className="text-sm text-gray-600">{designer.specialty}</p>
              </div>

              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(designer.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  {designer.rating} ({designer.reviews})
                </span>
              </div>

              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">{designer.bio}</p>
                <p className="text-lg font-bold text-gray-900">
                  ${designer.hourlyRate}/hour
                </p>
                <p className="text-xs text-gray-500">
                  Next available: {designer.nextAvailable}
                </p>
              </div>

              <button
                className={`w-full py-2 px-4 rounded-lg transition-colors ${
                  selectedDesigner?.id === designer.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {selectedDesigner?.id === designer.id ? 'Selected' : 'Select Designer'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Date & Time Selection */}
      {selectedDesigner && (
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Select Date & Time</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                      selectedTime === time
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedDate && selectedTime && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Consultation Summary</h4>
              <div className="text-green-800 text-sm space-y-1">
                <p><strong>Designer:</strong> {selectedDesigner.name}</p>
                <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Type:</strong> {consultationType === 'video' ? 'Video Call' : 'Phone Call'}</p>
                <p><strong>Duration:</strong> 60 minutes</p>
                <p><strong>Cost:</strong> ${selectedDesigner.hourlyRate}</p>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleScheduleConsultation}
              disabled={!selectedDate || !selectedTime}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedDesigner && (
        <div className="card text-center py-8">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose a Designer</h3>
          <p className="text-gray-600">
            Select a professional designer above to schedule your personalized consultation.
          </p>
        </div>
      )}
    </div>
  )
}

export default ConsultationScheduler