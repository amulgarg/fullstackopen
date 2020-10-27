import Part from 'components/Part';

const Content = (props) => {
    return <>
        {
            props.parts.map((part, index)=>{
                return <Part key={index} part={part.name} exercises={part.exercises}/>
            })
        }
    </>;
}

export default Content;