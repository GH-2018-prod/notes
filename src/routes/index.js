const { Router } = require('express');
const { json } = require('express/lib/response');
const router = Router();
const fs = require('fs');

const dataToRead = fs.readFileSync('src/resolve.json', 'utf-8');
let issues = JSON.parse(dataToRead);
const dataToDelete = fs.readFileSync('src/resolvedissues.json', 'utf-8');
let resolvedIssues = JSON.parse(dataToDelete);

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/aboutus', (req, res) => {
    res.render('aboutus');
})
router.get('/app', (req, res) => {
    res.render('app', {
        issues,
        resolvedIssues
    });
})

router.post('/app', (req, res) => {
    const { title, description } = req.body;
    let NewIssue = {
        title,
        description
    }
    if(!title || !description){
        res.status('400').send('el campo esta vacio');
        return;
    }
    issues.push(NewIssue);
    const dataToStore = JSON.stringify(issues);
    fs.writeFileSync('src/resolve.json', dataToStore, 'utf-8');
    res.redirect('/app');
})
router.get('/resolve/:title', (req, res)=>{
    const foundIssue = issues.find(issue => issue.title == req.params.title);
    const index = issues.indexOf(foundIssue);
    const issueToResolve = issues.splice(index,1);
    resolvedIssues.push(issueToResolve[0]);
    const dataToStoreResolved = JSON.stringify(resolvedIssues);
    const dataToStoreIssues = JSON.stringify(issues);
    fs.writeFileSync('src/resolvedissues.json', dataToStoreResolved, 'utf-8');
    fs.writeFileSync('src/resolve.json', dataToStoreIssues, 'utf-8');
    res.redirect('/app');
});
router.get('/delete/:title', (req, res)=>{
    resolvedIssues = resolvedIssues.filter(issue => issue.title != req.params.title);
    const dataToStore = JSON.stringify(resolvedIssues);
    fs.writeFileSync('src/resolvedissues.json', dataToStore, 'utf-8');
    res.redirect('/app');
})
module.exports = router;