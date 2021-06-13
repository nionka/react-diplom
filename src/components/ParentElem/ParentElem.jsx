import Banner from "../Banner/Banner";

function ParentElem({children}) {
  return (
    <main className="container">
        <div className="row">
            <div className="col">
              <Banner />
              {children}
            </div>
        </div>
    </main>
  )
}

export default ParentElem