async function healthCheck(req, res) {
    res.status(200).send('OK');
}

module.exports = { healthCheck };