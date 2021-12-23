import './form.scss';
import { useState } from 'react';

function Form(props) {
	const [restful, setRestful] = useState('GET');
	// const [url, setUrl] = useState('');

	let handleSubmit = (e) => {
		e.preventDefault();
    console.log('e.target:', e);
		const formData = {
      name: e.target[0].value,
			method: restful,
			url: e.target[1].value ? e.target[1].value : 'https://pokeapi.co/api/v2/pokemon',
		};
		props.handleApiCall(formData);
	};

	return (
		<>
			<h1 className='form'>Form</h1>

			<form onSubmit={handleSubmit}>
        <label>
          <span>Name of API</span>
          <input name='name' type='text' required />
        </label>
				<label>
					<span>URL: </span>
					<input data-testid="url-input" name='url' type='text' />
					<button type='submit'>
						GO!
					</button>
				</label>
				<label className='methods'>
					<button onClick={() => setRestful('GET')} className='get'>
						GET
					</button>
					<button onClick={() => setRestful('POST')} className='post'>
						POST
					</button>
					<button onClick={() => setRestful('PUT')} className='put'>
						PUT
					</button>
					<button onClick={() => setRestful('DELETE')} className='delete'>
						DELETE
					</button>
				</label>
			</form>
		</>
	);
}

export default Form;
