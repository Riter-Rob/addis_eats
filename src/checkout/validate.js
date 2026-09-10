/**
 * Pure form validation helper for Addis Ababa food delivery checkout.
 *
 * @param {Object} values - Current form values
 * @returns {Object} Object mapping field names to human-friendly error messages
 */
export function validateCheckout(values) {
  const errors = {}

  // Full Name validation
  if (!values.fullName || !values.fullName.trim()) {
    errors.fullName = 'Full Name is required.'
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = 'Please enter your full name (at least 3 characters).'
  }

  // Ethiopian Phone validation: supports 09XXXXXXXX, 07XXXXXXXX, +2519XXXXXXXX, +2517XXXXXXXX
  const phonePattern = /^(?:\+251|0)?[79]\d{8}$/
  const cleanPhone = (values.phone || '').replace(/[\s-]/g, '')
  if (!values.phone || !values.phone.trim()) {
    errors.phone = 'Phone number is required for dispatch call.'
  } else if (!phonePattern.test(cleanPhone)) {
    errors.phone = 'Enter a valid Ethiopian mobile number (e.g., 0911223344 or +251 911 223344).'
  }

  // Sub-city / delivery zone selection
  if (!values.subCity || !values.subCity.trim() || values.subCity === '') {
    errors.subCity = 'Please select your delivery Sub-City in Addis Ababa.'
  }

  // Street address / landmark
  if (!values.streetAddress || !values.streetAddress.trim()) {
    errors.streetAddress = 'Delivery address or nearest landmark is required.'
  } else if (values.streetAddress.trim().length < 5) {
    errors.streetAddress = 'Please provide more details (e.g. Bole Medhanialem, next to Edna Mall).'
  }

  // Payment method
  if (!values.paymentMethod) {
    errors.paymentMethod = 'Please choose a payment method.'
  }

  return errors
}
