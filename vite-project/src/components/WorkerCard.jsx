function WorkerCard({ name, service, phone, description, birthday }) {
    return (
        <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h3>Name: {name}</h3>
            <p>Service: {service}</p>
            <p>Contact: {phone}</p>
            <p>Description: {description}</p>
            <p>Birthday: {birthday}</p>
        </div>
    );
}

export default WorkerCard;