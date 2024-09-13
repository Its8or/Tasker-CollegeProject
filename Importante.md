###### NOTA user@Got8or2001:
### Rapaziada eh o seguinte, pra vcs poderem manipular tudo instalem o  **---> 'Github Desktop' <---** ele vai reduzir a dor de cabeca de vcs.
la ja da pra manipular tudo sem muitas linhas de codigo, eh importante tbm vcs intalarem o **---> GIT <---** no pc pra vcs fazerem algumas coisinhas basicas do projeto, como pull request, branch, etc. 

fica a criterio de vcs e com o tempo vcs vao pegar o jeito com isso, caso interessados em aprender GIT vejam esse site:
**---> https://learngitbranching.js.org/?locale=pt_BR <---**
Ele ensina GIT com interface visual, muito util a nivel didatico.
Recomendo vcs chegarem ate a sessao 'Acelerado: 4' pra poderem mexer com as coisas mais basica, e pra mexer no remoto vejam a sessão 'Remote' completa, assim vcs terão dificuldades em dar merge, push e pull request.
Mais uma dica, facam suas versoes das questoes e vejam e aprendam a resolucao mais "rapida/curta" do exercicio, ajuda muito.

Sigam o seguinte video pra entender o que vcs devem fazer pra "atualizar" o repo do trabalho.
**--> https://www.youtube.com/watch?v=jhtbhSpV5YA <---**
Como sempre, ta em ingles, mas vcs tankam assistir.

###### ---> Update.

### Seguinte, pra quem tiver com preguiça de ficar vendo o video aqui vão ---> ALGUNS COMANDOS <--- do vídeo pra reduzir o tempo gasto aprendendo os cogidos de ---> GIT. <---

###### **Depois de abrir o Git Bash:**

* Mudar o diretório pra pasta do projeto: 
**_cd C://college-project_**

* Clonar o repo para o seu computador(local): 
**_git clone git@github.com:Its8or/college-project.git_**

* Crie um galho(branch): 
_**git checkout -b [nome da branch: deem uma olhada nas regras pra nomear branches]**_

* altera o que tem que mudar e adiciona na branch: 
**_git add -A_**

* commita a mudança, add texto descritivo: 
**_git commit -m '[nome] alterou html e css'_**
  
* upar as mudancas no GitHub pra n fazer cagada quando fizer a pull request: 
**_git push -u origin [branch]_**

* pull request via Git: 
_**git pull origin master**_

###### ---> mesma coisa so que no GitHub:
* vai na pagina do **github.com/Its8or/college-project** , aparece uma sessao 'Compare & pull request', entra nela faz a commit e faz o pedido.

---

##### Caso dê algum erro(ou não):

* push request para parear os arquivos local com a master: 
**_git push_**

---

* Sai da branch e vai pra master de novo:
**_git checkout master_**

* Deleta a branch do local:
_**git branch -D [branch_usada]**_

Agora, tudo que precisamos fazer eh por a mao na massa,
        BOA SORTE!
