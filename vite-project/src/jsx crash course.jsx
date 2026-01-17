import Message from './Message';

function App(){

  const name = 'My name';
  const x = 10;
  const y = 20;
  const names = ['Luana', 'Matheus', 'Gustavo', 'Helena'];
  const style = {
    color: 'blue',
    fontSize: '55px'
  }


  return (
    <>  {/* it's a fragment */}

      <div className='text-5xl'><Message /></div>
      <p style={ { color: 'red'} }>Testing {name} {x+y}</p>

      <u style={ style }>
        {names.map((item, index) => (
          <li key={index}>{item}, {index}</li>
        ))}
      </u>

      {x === 10 ? <h2>x equals 10</h2> : <h2>x equals something that is not 10</h2>}

    </>
    );
}

export default App; 