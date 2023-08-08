import './bigTitle.css'

function BigTitle({title , subtitle} ) {
  return (
    <>
    <div className="containerhead">

    <div className='bigTitleContainer'>
        <h2>{title}</h2>
    </div>
    <p>{subtitle}</p>
    </div>
    </>
  )
}

export default BigTitle