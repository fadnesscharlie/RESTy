import './history.scss'

function History(props) {
  return (
    <>
      <section className='history'>
				{props.state.historyURL.length
					? props.state.historyURL.map((url, index) => {
							return <pre key={index}><li> Url {url}</li></pre>;
					  })
            
					: 'No URL\s Entered!'}
			</section>
    </>
  )
}

export default History;
