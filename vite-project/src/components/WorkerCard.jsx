function WorkerCard({ name, service, phone, description, birthday }) {
    return (
        <div className='card h-100 shadow-sm hover-shadow transition'>
            <div className='card-header bg-primary text-white'>
                <h5 className='card-title mb-0'>
                    <i className='bi bi-person-circle'></i> {name}
                </h5>
            </div>
            <div className='card-body'>
                <div className='mb-2'>
                    <span className='badge bg-success mb-2'>
                        <i className='bi bi-briefcase'></i> {service}
                    </span>
                </div>
                
                <p className='card-text'>
                    <i className='bi bi-telephone-fill text-primary'></i> 
                    <strong> Contact:</strong> {phone}
                </p>
                
                <p className='card-text'>
                    <i className='bi bi-calendar-event text-warning'></i> 
                    <strong> Birthday:</strong> {new Date(birthday).toLocaleDateString()}
                </p>
                
                {description && (
                    <div className='mt-3'>
                        <p className='card-text text-muted'>
                            <i className='bi bi-info-circle'></i> 
                            <strong> About:</strong>
                        </p>
                        <p className='card-text small'>{description}</p>
                    </div>
                )}
            </div>
            <div className='card-footer bg-light'>
                <button className='btn btn-outline-primary btn-sm w-100'>
                    <i className='bi bi-chat-dots'></i> Contact Worker
                </button>
            </div>
        </div>
    );
}

export default WorkerCard;