import './results.scss'

function Results(props) {
  return (
    <>
      <h1 className='results'>Results</h1>
      <section className='results'>
        <pre>{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
      </section>
    </>
  )
}

export default Results;
