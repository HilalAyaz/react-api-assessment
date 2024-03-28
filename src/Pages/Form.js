import React, { useState } from 'react'

const FormPage = () => {
  // Define state variables for form data and form errors
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    message: '',
    image: null
  })

  const [formErrors, setFormErrors] = useState({})

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault()
    setFormErrors({})

    const errors = {}
    // Validate form data
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name'
    }
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address'
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your phone number'
    }
    if (!formData.address.trim()) {
      errors.address = 'Please enter your address'
    }
    if (!formData.message.trim()) {
      errors.message = 'Please enter a message'
    }
    if (!formData.image) {
      errors.image = 'Please upload an image'
    }

    // Display errors if any
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // If no errors, submit form data and reset form
    console.log(formData)
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      gender: '',
      message: '',
      image: null
    })
  }

  // Handle form input changes
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  // Handle file input change (for image upload)
  const handleFileChange = e => {
    const file = e.target.files[0]
    setFormData(prevData => ({
      ...prevData,
      image: file
    }))
  }

  return (
    <div className='container mx-auto mt-8'>
      <form
        onSubmit={handleSubmit}
        className='max-w-[600px] mx-auto bg-white p-8 rounded shadow-md'
      >
        <h2 className='text-2xl font-semibold mb-4 text-center capitalize'>
          Let's hear from you
        </h2>
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-400'
          />

          {formErrors.name && (
            <p className='text-red-500 text-sm mt-1'>{formErrors.name}</p>
          )}
        </div>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-400'
          />

          {formErrors.email && (
            <p className='text-red-500 text-sm mt-1'>{formErrors.email}</p>
          )}
        </div>
        <div className='mb-4'>
          <label
            htmlFor='phone'
            className='block text-sm font-medium text-gray-700'
          >
            Phone
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-400'
          />

          {formErrors.phone && (
            <p className='text-red-500 text-sm mt-1'>{formErrors.phone}</p>
          )}
        </div>
        <div className='mb-4'>
          <label
            htmlFor='address'
            className='block text-sm font-medium text-gray-700'
          >
            Address
          </label>
          <input
            type='text'
            id='address'
            name='address'
            value={formData.address}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-400'
          />

          {formErrors.address && (
            <p className='text-red-500 text-sm mt-1'>{formErrors.address}</p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Gender
          </label>
          <div className='mt-2'>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                name='gender'
                value='male'
                checked={formData.gender === 'male'}
                onChange={handleChange}
                className='form-radio h-4 w-4 text-blue-500'
              />
              <span className='ml-2'>Male</span>
            </label>
            <label className='inline-flex items-center ml-6'>
              <input
                type='radio'
                name='gender'
                value='female'
                checked={formData.gender === 'female'}
                onChange={handleChange}
                className='form-radio h-4 w-4 text-blue-500'
              />
              <span className='ml-2'>Female</span>
            </label>
          </div>

          {formErrors.gender && (
            <p className='text-red-500 text-sm mt-1'>{formErrors.gender}</p>
          )}
        </div>
        <div className='mb-4'>
          <label
            htmlFor='message'
            className='block text-sm font-medium text-gray-700'
          >
            Message
          </label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            rows='4'
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-400'
          ></textarea>

          {formErrors.message && (
            <p className='text-red-500 text-sm mt-1'>{formErrors.message}</p>
          )}
        </div>
        <div className='mb-4'>
          <label
            htmlFor='image'
            className='block text-sm font-medium text-gray-700'
          >
            Upload Resume
          </label>
          <input
            type='file'
            id='image'
            name='image'
            accept='image/*'
            onChange={handleFileChange}
            className='mt-1 p-2 w-full border rounded-md focus:outline-none '
          />

          {formErrors.image && (
            <p className='text-red-500 text-sm mt-1'>{formErrors.image}</p>
          )}
        </div>
        <div className='mt-6'>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none '
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormPage
