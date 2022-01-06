import './form.scss';
import { useRef, useEffect, useState, useReducer } from 'react';
import axios from 'axios';

const initialState = {
	restful: '',
	url: '',
	item: '',
	body: 'Fake Data'
}

function apiReducer(state = initialState, action) {

	const { type, payload } = action;

	switch(type) {
		default:
			return state;
		case 'API/GET':
			return {
				...state,
				restful: payload
			}
		case 'API/PUT':
			return {
				...state,
				restful: payload
			}
		case 'API/POST':
			return {
				...state,
				restful: payload
			}
		case 'API/DELETE':
			return {
				...state,
				restful: payload
			}
		case 'API/URL':
			return {
				...state,
				url: payload
			}
		case 'API/ITEM':
			return {
				...state,
				item: [...state, payload]
			}
		case 'API/BODY':
			return {
				...state,
				body: [...state, payload]
			}
	}
}

export default function APICaller (props) {
	const [state, dispatch] = useReducer(apiReducer, initialState);

	const isInitialMount = useRef(true)

	let handleSubmit = (e) => {
		try {
			e.preventDefault();
			// console.log('e.target:', e);
	
			dispatch({type: 'API/URL', payload: e.target[1].value});
			// dispatch({type: 'API/BODY', payload: e.target[2].value});
	
			const formData = {
				name: e.target[0].value,
				method: state.restful,
				url: e.target[1].value
					? e.target[1].value
					: 'No API Added',
				body: e.target[2].value
			};
			props.handleApiCall(formData);
		} catch (e) {
			console.log(e)
		}
	};
  
	useEffect(() => {
		if(isInitialMount.current) {
			isInitialMount.current = false;
		}
		switch(state.restful) {
			case 'GET':
				console.log('hello from GET in useEffect')
				axios({
					method: 'get',
					url: state.url ? state.url : `https://jsonplaceholder.typicode.com/posts`,
				})
					.then((response) => { 
						console.log('response:', JSON.stringify(response.data, null, 2))
					// dispatch({type: 'API/ITEM', payload: response.data});
					})

					break;
			case 'POST':
				axios({
					method: 'post',
					url: state.url ? state.url : `https://jsonplaceholder.typicode.com/posts`,
					data: state.body
				})
				break;
			case 'PUT':
				axios({
					method: 'post',
					url: state.url ? state.url : `https://jsonplaceholder.typicode.com/posts/1`,
					data: state.body
				})
				break;
			case 'DELETE':
				axios({
					method: 'delete',
					url: state.url ? state.url : `https://jsonplaceholder.typicode.com/posts/1`,
					
				})
				break;
			default:
				console.log(state)
				break;
			}
			}, [state.url])
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
					{state.restful === 'POST' || state.restful === 'PUT' ? (
						<label>
							<span>Body info</span>
							<input name='body' type='text' />
						</label>
					) : (
						''
						)}
				<label className='methods'>
					<button onClick={() => dispatch({type:'API/GET', payload:'GET'})} className='get'>
						GET
					</button>
					<button onClick={() => dispatch({type:'API/POST', payload:'POST'})} className='post'>
						POST
					</button>
					<button onClick={() => dispatch({type:'API/PUT', payload:'PUT'})} className='put'>
						PUT
					</button>
					<button onClick={() => dispatch({type:'API/DELETE', payload:'DELETE'})} className='delete'>
						DELETE
					</button>
						<button type='submit'>GO!</button>
				</label>
			</form>

			{ state.restful==='POST' ? <pre>RESTFUL WORKS {state.body}</pre> : ''}


			{/* Does not run correctly because I am having trouble having it wait for Data. Currently it is trying to find item.Data, and its not there when loading in */}
			<div className='items'>
				{ state.item
				? state.item.map((items, index) => {
					return <pre key={index}>{JSON.stringify(items.title)}</pre>;
				}) 
				: state.restful==='POST' 
				? <pre>{state.body}</pre> 
				: ''}
			</div>
		</>
	);
}

// export default Form;
