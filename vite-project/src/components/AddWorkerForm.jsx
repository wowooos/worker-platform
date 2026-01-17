import { useState } from "react";

function AddWorkerForm( {onAddWorker, services} ){
    const [formData, setFormData] = useState(
        {
            first_name:'',
            last_name:'',
            service:'',
            phone:'',
            gender:'',
            date_of_birth: '',
            description:'',
        }
    );

    const handleSubmit = async (event) => {
        let invalidField = {};
        event.preventDefault();

        // Validate phone
        if(formData.phone.length !== 11){
            alert('Phone must be exactly 11 digits!');
            invalidField.phone = '';
            // return; // stop submission
        }

        // Validate services
        // const validServices = ['cleaning', 'tutoring', 'repair', 'beauty'];
        if(!services.includes(formData.service.toLowerCase())){
            alert('Invalid service type!');
            invalidField.service = '';
            // return;
        }

        if(Object.keys(invalidField).length > 0){   // if invalidField is not empty (has any key value pair)
            setFormData({...formData, ...invalidField});
            console.log('formData: ', formData);
            console.log('invalidField: ', invalidField);
            return;
        }

        //---------------------------------------------------------------

        await onAddWorker(formData);

        // clear form after success
        setFormData({
            first_name: '',
            last_name: '',
            service: '',
            phone: '',
            gender: '',
            date_of_birth: '',
            description: ''
        });
    };
    
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    return(
        <form onSubmit={handleSubmit} style={{border: '2px solid blue', padding: '20px', margin: '20px'}}>
            <h2>Add New Worker</h2>

            <input 
                type="text"
                name='first_name' 
                placeholder='First name' 
                required
                value={formData.first_name}
                onChange={handleChange}
                />

            <input 
                type="text"
                name='last_name' 
                placeholder='Last name' 
                required
                value={formData.last_name}
                onChange={handleChange}
                />

            <input 
                type="text"
                name='service' 
                placeholder='Service' 
                required
                value={formData.service}
                onChange={handleChange}
                />

            <input 
                type="tel"
                name='phone' 
                placeholder='Phone' 

                // minLength="11"
                // maxLength="11"
                // pattern="[0-9]{11}"

                // onInvalid={(e) => e.target.setCustomValidity('Phone must be exactly 11 digits!')}
                // onInput={(e) => e.target.setCustomValidity('')}                
                
                required
                value={formData.phone}
                onChange={handleChange}
            />

            <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required    
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>

            <input 
                type='date' 
                name='date_of_birth' 
                required
                value={formData.date_of_birth}
                onChange={handleChange}
            />

            <textarea 
                name='description' 
                placeholder='Description (optional)'
                value={formData.description}
                onChange={handleChange}
                rows={5} 
            />

            <button type='submit'>Add Worker</button>

            <p>{formData.first_name}</p>
            <p>{formData.last_name}</p>
            <p>{formData.service}</p>
            <p>{formData.phone}</p>
            <p>{formData.gender}</p>
            <p>{formData.date_of_birth}</p>
            <p>{formData.description}</p>

        </form> 
    );        

}

export default AddWorkerForm;