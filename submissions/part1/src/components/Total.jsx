const Total = (props, secondarg) => {
    console.log('secondarg', secondarg);
    return <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>;
}

export default Total;