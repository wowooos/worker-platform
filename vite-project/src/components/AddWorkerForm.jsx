import { useState } from "react";

function AddWorkerForm({ onAddWorker, services }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        service: '',
        phone: '',
        gender: '',
        date_of_birth: '',
        description: '',
    });

    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (event) => {
        let invalidField = {};
        event.preventDefault();

        // Validate phone
        if(formData.phone.length !== 11){
            alert('Phone must be exactly 11 digits!');
            invalidField.phone = '';
        }

        // Validate services
        if(!services.includes(formData.service.toLowerCase())){
            alert('Invalid service type!');
            invalidField.service = '';
        }

        if(Object.keys(invalidField).length > 0){
            setFormData({...formData, ...invalidField});
            return;
        }

        await onAddWorker(formData);

        // Clear form after success
        setFormData({
            first_name: '',
            last_name: '',
            service: '',
            phone: '',
            gender: '',
            date_of_birth: '',
            description: ''
        });
        
        // Show success message
        alert('Worker added successfully!');
        setShowForm(false);
    };
    
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    return(
        <div className='card shadow'>
            <div className='card-header bg-success text-white d-flex justify-content-between align-items-center'>
                <h4 className='mb-0'>
                    <i className='bi bi-person-plus'></i> Add New Worker
                </h4>
                <button 
                    className='btn btn-light btn-sm'
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Hide Form' : 'Show Form'}
                </button>
            </div>
            
            {showForm && (
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            {/* First Name */}
                            <div className='col-md-6 mb-3'>
                                <label htmlFor='first_name' className='form-label'>First Name</label>
                                <input 
                                    type="text"
                                    name='first_name' 
                                    id='first_name'
                                    className='form-control'
                                    placeholder='Enter first name' 
                                    required
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Last Name */}
                            <div className='col-md-6 mb-3'>
                                <label htmlFor='last_name' className='form-label'>Last Name</label>
                                <input 
                                    type="text"
                                    name='last_name'
                                    id='last_name' 
                                    className='form-control'
                                    placeholder='Enter last name' 
                                    required
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Service */}
                            <div className='col-md-6 mb-3'>
                                <label htmlFor='service' className='form-label'>Service</label>
                                <input 
                                    type="text"
                                    name='service'
                                    id='service'
                                    className='form-control'
                                    placeholder='e.g., Plumber, Electrician' 
                                    required
                                    value={formData.service}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Phone */}
                            <div className='col-md-6 mb-3'>
                                <label htmlFor='phone' className='form-label'>Phone</label>
                                <input 
                                    type="tel"
                                    name='phone'
                                    id='phone'
                                    className='form-control'
                                    placeholder='11 digits (e.g., 11999887766)' 
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Gender */}
                            <div className='col-md-6 mb-3'>
                                <label htmlFor='gender' className='form-label'>Gender</label>
                                <select
                                    name="gender"
                                    id='gender'
                                    className='form-select'
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required    
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Date of Birth */}
                            <div className='col-md-6 mb-3'>
                                <label htmlFor='date_of_birth' className='form-label'>Date of Birth</label>
                                <input 
                                    type='date'
                                    name='date_of_birth'
                                    id='date_of_birth'
                                    className='form-control'
                                    required
                                    value={formData.date_of_birth}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Description */}
                            <div className='col-12 mb-3'>
                                <label htmlFor='description' className='form-label'>Description (Optional)</label>
                                <textarea 
                                    name='description'
                                    id='description'
                                    className='form-control'
                                    placeholder='Tell us about this worker...'
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4} 
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='d-grid'>
                            <button type='submit' className='btn btn-success btn-lg'>
                                <i className='bi bi-check-circle'></i> Add Worker
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );        
}

export default AddWorkerForm;