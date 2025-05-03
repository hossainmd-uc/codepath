
const Card = (props) => {

    return (
        <div className="Card">
            <img class={"" + props.class} src={props.src} />
            <h3>React</h3><h4>{props.diff}</h4><a href={props.href}>
            <button>View Video</button></a>

        </div>
    )
}

export default Card;