import React, { useState } from 'react'

const FormPage = () => {
  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    message: '',
    image: null
  }

  const [formData, setFormData] = useState(initialFormData)
  const [formErrors, setFormErrors] = useState({})
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    validateForm()

    // Reset file input
    const fileInput = document.getElementById('image')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleBlur = (e, regex, errorMessage) => {
    const { name, value } = e.target
    if (!regex.test(value)) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: errorMessage
      }))
    } else {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      const allowedExtensions = /\.(jpg|jpeg|png|gif)$/i
      if (!allowedExtensions.test(file.name)) {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          image:
            'Please upload a valid image file (jpg, jpeg, png, gif) or a photo of your cat doing yoga.'
        }))
        setFormData(prevData => ({
          ...prevData,
          image: null
        }))
      } else {
        setFormData(prevData => ({
          ...prevData,
          image: file
        }))
        setFormErrors(prevErrors => ({
          ...prevErrors,
          image: ''
        }))
      }
    }
  }

  const validateForm = () => {
    const errors = {}
    for (const key in formData) {
      if (key === 'image' && !formData[key]) {
        errors[key] =
          'Please upload an image. Remember, a picture is worth a thousand words!'
      } else if (key !== 'image' && !formData[key].trim()) {
        errors[
          key
        ] = `Please enter your ${key}. Don't be shy, we won't bite...unless you're a cookie. 🍪`
      }
    }
    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      // Simulate form submission
      console.log(formData)
      setFormSubmitted(true)
      setTimeout(() => {
        resetForm()
      }, 3000) // Reset form after 3 seconds
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setFormErrors({})
    setFormSubmitted(false)
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
        {/* Name */}
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
            onBlur={e =>
              handleBlur(
                e,
                /^[a-zA-Z ]*$/,
                'Please enter a name. A clever name is like a good joke - it leaves an impression!'
              )
            }
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-400'
          />
          {formErrors.name && (
            <p className='text-orange-600 text-sm mt-1'>{formErrors.name}</p>
          )}
        </div>
        {/* Email */}
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
            onBlur={e =>
              handleBlur(
                e,
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Invalid email address. Did you enter your email or your cat's meow?"
              )
            }
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-400'
          />
          {formErrors.email && (
            <p className='text-orange-600 text-sm mt-1'>{formErrors.email}</p>
          )}
        </div>
        {/* Phone */}
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
            onBlur={e =>
              handleBlur(
                e,
                /^[0-9]*$/,
                "Please enter a valid 10-digit phone number. Don't worry, robots won't call you... we think."
              )
            }
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-400'
          />
          {formErrors.phone && (
            <p className='text-orange-600 text-sm mt-1'>{formErrors.phone}</p>
          )}
        </div>
        {/* Address */}
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
            onBlur={e =>
              handleBlur(e, /^[a-zA-Z0-9\s,'-]*$/, 'Invalid address')
            }
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-400'
          />
          {formErrors.address && (
            <p className='text-orange-600 text-sm mt-1'>{formErrors.address}</p>
          )}
        </div>
        {/* Gender */}
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
            <p className='text-orange-600 text-sm mt-1'>{formErrors.gender}</p>
          )}
        </div>
        {/* Message */}
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
            onBlur={e =>
              handleBlur(
                e,
                /^[a-zA-Z0-9\s.,!?()-]*$/,
                "Your message cannot be empty. It's like sending a blank postcard to the Bermuda Triangle!"
              )
            }
            rows='4'
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-400'
          ></textarea>
          {formErrors.message && (
            <p className='text-orange-600 text-sm mt-1'>{formErrors.message}</p>
          )}
        </div>
        {/* Upload Image */}
        <div className='mb-4'>
          <label
            htmlFor='image'
            className='block text-sm font-medium text-gray-700'
          >
            Upload Image
          </label>
          <input
            type='file'
            id='image'
            name='image'
            accept='image/*'
            onChange={handleFileChange}
            className='mt-1 p-2 w-full border rounded-md focus:outline-none'
          />
          {formErrors.image && (
            <p className='text-orange-600 text-sm mt-1'>{formErrors.image}</p>
          )}
        </div>
        {/* Submit Button */}
        <div className='mt-6'>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none'
          >
            Submit
          </button>
        </div>
        {/* Form Submission Success Message */}
        {formSubmitted && (
          <p className='text-green-500 mt-4 text-center'>
            Form submitted successfully!
          </p>
        )}
      </form>
    </div>
  )
}

export default FormPage
