import './footer.css';

function Footer({children}) {
  return (
    <footer className="container bg-light footer">
        <div className="row">           
          {children}    
        </div>
    </footer>
  )
}

export default Footer