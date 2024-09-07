export default function Description({description}) {
    return (
        <div className="home-grid__item-description">
            <div className="description-text">
                <p>
                    {description}
                </p>
            </div>
            <img src="/images/arrow.png" alt=""/>
        </div>
    )
}
