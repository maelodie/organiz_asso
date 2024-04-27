function NewComponent({att1, att2}){
    return(
		<div>
			<h1>{att1}</h1>
            <p>{att2}</p>
		</div>
	)
}

export default NewComponent

/*
function NewComponent(props){
    return(
		<div>
			<h1>{props.att1}</h1>
            <p>{props.att2}</p>
		</div>
	)
}

export default NewComponent
*/