export default function Buttons ({sortA, sortD, resetAll}) {

    return (
        <div className="button-father">
            <button className="button" onClick={() => sortA()}>Sort A-Z</button>
            <button className="button" onClick={() => sortD()}>Sort Z-A</button>
            <button className="button" onClick={() => resetAll()}>Reset</button> 
        </div>
    )
}