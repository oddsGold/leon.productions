export default function Talk({handleShowModal}) {
    return(
        <div className="talk">
            <p>VFX, CGI and even more</p>
            <p>Let's <span onClick={handleShowModal}>talk</span> about it</p>
        </div>
    )
}
