const baseUrl='https://api.github.com/users/'
let form=document.getElementById('form')
let search=document.getElementById('search')
let main=document.querySelector('main')
function getUserData(username){
    axios.get(baseUrl + username).
    then(res => {
        let userInfo=res.data
        console.log(userInfo)
        updateUI(userInfo)
        getUserRepos(username)
    })
    .catch(err=> {
        if(err.response.status == 404){
            displayErrorUI("No User Found")
        }
    } )
}
function getUserRepos(username){
    axios.get(baseUrl + username + '/repos?sort=created').
    then(res => {
        let userRepos=res.data
        console.log(userRepos)
        displayUserRepos(userRepos)
    })
    .catch(err=> {
            displayErrorUI("Problem Fetching Data")
    } )
}
//first step when submit the form take user name  that user write then call API with that username

form.addEventListener('submit' ,(e)=>{
    e.preventDefault()
    let user=search.value
    if(user){
        getUserData(user)
        search.value=''
    }
})
//second step draw user UI after get the userInfo
function updateUI(user){
    main.innerHTML=''
    let box=`
    <div class="box">
            <div>
                <img src="${user.avatar_url}" alt="${user.login}">
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul>
                    <li><strong>${user.followers}</strong>Followers</li>
                    <li><strong>${user.following}</strong>Following</li>
                    <li><strong>${user.public_repos}</strong>Repos</li>
                </ul>
                <div class="repos-links">
                   
                </div>
            </div>
        </div>
    `
    main.innerHTML=box
}
//check if the User Not Found
function displayErrorUI(msg){
    let box=`
    <div class="box">
    <h1>${msg}</h1>
    </div>
    `
    main.innerHTML=box
}
function displayUserRepos(reposData){
    let repos=document.querySelector('.repos-links')
    reposData.slice(0,10).forEach(repo => {
        let repoElement=document.createElement('a');
        repoElement.className='repo';
        repoElement.target='_blank'
        repoElement.innerText=repo.name
        repoElement.href=repo.html_url
        repos.appendChild(repoElement)     
    });

}