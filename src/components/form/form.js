import './form.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Form(props) {
	const [restful, setRestful] = useState('');
	const [url, setUrl] = useState('');
	const [item, setItem] = useState('');
	const [body, setBody] = useState('Fake Data');

	let handleSubmit = (e) => {
		e.preventDefault();
		// console.log('e.target:', e);

		setUrl(e.target[1].value);
		setBody(e.target[2].value)

		const formData = {
			name: e.target[0].value,
			method: restful,
			url: e.target[1].value
				? e.target[1].value
				: 'No API Added',
			body: e.target[2].value
		};
		props.handleApiCall(formData);
	};

	useEffect(() => {
		switch(restful) {
			case 'GET':
				axios({
					method: 'get',
					url: url ? url : `https://jsonplaceholder.typicode.com/posts`,
				})
					.then((response) => { 
						// console.log('response:', JSON.stringify(response.data, null, 2))
						setItem(response.data)
					})
					break;
			case 'POST':
				axios({
					method: 'post',
					url: url ? url : `https://jsonplaceholder.typicode.com/posts`,
					data: body
				})
				// .then((response) => response.json())
				// .then((json) => console.log(json));
				break;
			case 'PUT/1':
				axios({
					method: 'post',
					url: url ? url : `https://jsonplaceholder.typicode.com/posts`,
					data: body
				})
				// .then((response) => response.json())
				// .then((json) => console.log(json));
				break;
			case 'DELETE':
				axios({
					method: 'delete',
					url: url ? url : `https://jsonplaceholder.typicode.com/posts`,
					
				})
				// .then((response) => response.json())
				// .then((json) => console.log(json));
				break;
			default:
				console.log('Default');
				break;
			}
			}, [url])
			// console.log('item',item)

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
					<input data-testid='url-input' name='url' type='text' />
				</label>
					{/* Only add body if Post or Put is Selected */}
					{restful === 'POST' || restful === 'PUT/1' ? (
						<label>
							<span>Body info</span>
							<input name='body' type='text' />
						</label>
					) : (
						''
						)}
				<label className='methods'>
					<button onClick={() => setRestful('GET')} className='get'>
						GET
					</button>
					<button onClick={() => setRestful('POST')} className='post'>
						POST
					</button>
					<button onClick={() => setRestful('PUT/1')} className='put'>
						PUT
					</button>
					<button onClick={() => setRestful('DELETE')} className='delete'>
						DELETE
					</button>
						<button type='submit'>GO!</button>
				</label>
			</form>

			{ restful==='POST' ? <pre>RESTFUL WORKS {body}</pre> : ''}


			{/* Does not run correctly because I am having trouble having it wait for Data. Currently it is trying to find item.Data, and its not there when loading in */}
			<div className='items'>
				{ item
				? item.map((items, index) => {
					return <pre key={index}>{JSON.stringify(items.title)}</pre>;
				}) 
				: restful==='POST' 
				? <pre>{body}</pre> 
				: ''}
			</div>
		</>
	);
}

export default Form;
