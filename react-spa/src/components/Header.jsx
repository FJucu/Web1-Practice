function Header(){
    return(
        <header>
        <h1>Web programozás-1 Előadás Házi feladat</h1>
        <nav>
            <a href="../../index.html">Főoldal</a>
            <a href="../../javascript.html">Csapatok listája (JS CRUD)</a>
            <a href="../../react.html">Játékosok (React CRUD)</a>
            <a href="./index.html" className="active">SPA React</a>
            <a href="../../fetchapi.html">Fetch API</a>
        </nav>
    </header>
    );

}

export default Header;