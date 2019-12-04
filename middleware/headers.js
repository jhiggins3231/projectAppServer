module.exports = (req, res, next) => { // Exporting our headers for use in other files
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    next();
}
// lines(2-4) Establishing our headers
// line (6) moves us to the next step\\