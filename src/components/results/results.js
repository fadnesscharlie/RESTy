import './results.scss'

function Results(props) {
  return (
    <>
      <div className='items'>
				{props.state.item.length ? (
					props.state.item.map((items, index) => {
						return <pre key={index}><li>{items.title}</li></pre>;
					})
				) : props.state.restful === 'POST' ? (
					<pre>{props.state.body}</pre>
				) : (
					'No Results to Show Yet!'
				)}
			</div>
    </>
  )
}

export default Results;
