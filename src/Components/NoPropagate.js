
const NoPropagate = props => {
    console.log("No Propagate fired")
    return (
        <div onClick={e => e.stopPropagation()}>
            {props.children}
        </div>
    );
}

export default NoPropagate