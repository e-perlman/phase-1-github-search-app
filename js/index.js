function init(){
    const form=document.querySelector('#github-form')
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        const input=document.querySelector('#search')
        fetchUsers(input)
    })
    function fetchUsers(input){
        fetch(`https://api.github.com/search/users?q=${input.value}`,{
            headers:{
                'Content-Type':'application/vnd.github.v3+json',
                Accept:'application/vnd.github.v3+json'
            }
        })
        .then(res=>res.json())
        .then(names=>createList(names))
    }
    function createList(names){
        //console.log(names.items)
        names.items.forEach(user=>userInfo(user))
    }
    function userInfo(names){
      const user=document.createElement('li')
      user.id=names.id
      //document.querySelector('#user-list').appendChild(user)

      const username=document.createElement('h3')
      username.textContent=names.login
      username.id=names.login
      username.className='user-name'

      const avatar=document.createElement('img')
      avatar.src=`${names.avatar_url}`

      const profile=document.createElement('a')
      profile.textContent='Profile Link'
      profile.className='link'
      profile.href=`${names.html_url}`
      
      user.append(username,avatar,profile)
      document.querySelector('#user-list').appendChild(user)

      username.addEventListener('click',()=>{
        fetchRepo(names.login)
        }
      )
    }
    function fetchRepo(name){
        fetch(`https://api.github.com/users/${name}/repos`,{
            headers:{
                'Content-Type':'application/vnd.github.v3+json',
                Accept:'application/vnd.github.v3+json'
            }
        })
        .then(res=>res.json())
        .then(repos=>{
            repos.forEach(repo=>{
                const repoName=document.createElement('li')
                repoName.className='repo'
                repoName.textContent=repo.name
                document.querySelector(`#${name}`).appendChild(repoName)
           })
        })
    } 
}


document.addEventListener('DOMContentLoaded', init)