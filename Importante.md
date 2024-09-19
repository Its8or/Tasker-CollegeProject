NOTA user@Its8or:
Rapaziada eh o seguinte, pra vcs poderem manipular tudo instalem o  ---> 'Github Desktop' <--- ele vai reduzir a dor de cabeca de vcs.
>>>>>>> 7683313aded8632e008e02b5ec5d1231cc612660

la ja da pra manipular tudo sem muitas linhas de codigo, eh importante tbm vcs intalarem o ---> GIT <--- no pc pra vcs fazerem algumas coisinhas basicas do projeto, como pull request, branch, etc. 

fica a criterio de vcs e com o tempo vcs vao pegar o jeito com isso, caso interessados em aprender GIT vejam esse site:
---> https://learngitbranching.js.org/?locale=pt_BR <---
Ele ensina GIT com interface visual, muito util a nivel didatico.
Recomendo vcs chegarem ate a sessao 'Acelerado: 4' pra poderem mexer com as coisas mais basica, e pra mexer no remoto vejam a sessão 'Remote' completa, assim vcs terão dificuldades em dar merge, push e pull request.
Mais uma dica, facam suas versoes das questoes e vejam e aprendam a resolucao mais "rapida/curta" do exercicio, ajuda muito.

Sigam o seguinte video pra entender o que vcs devem fazer pra "atualizar" o repo do trabalho.
--> https://www.youtube.com/watch?v=jhtbhSpV5YA <---
Como sempre, ta em ingles, mas vcs tankam assistir.

--------------------> Update.

# Seguinte, pra quem tiver com preguiça de ficar vendo o video aqui vão ---> ALGUNS COMANDOS <--- do vídeo pra reduzir o tempo gasto aprendendo os cogidos de ---> GIT. <---

*** Depois de abrir o Git Bash:

* Mudar o diretório pra pasta do projeto
cd C://college-project

* Clonar o repo para o seu computador(local):
git clone git@github.com:Its8or/college-project.git [ENTER]

* Crie um galho(branch):
git checkout -b [nome da branch: deem uma olhada nas ruleset pra nomear branches] [ENTER]

* altera o que tem que mudar e adiciona na branch:
git add -A

* commita a mudança, add texto descritivo
git commit -m '[nome] alterou html e css'

* upar as mudancas no GitHub pra n fazer cagada quando fizer a pull request:
git push -u origin [branch]

* pull request via Git
git pull origin master

---> mesma coisa so que no GitHub:
        vai na pagina do github.com/Its8or/college-project
        aparece uma sessao 'Compare & pull request', entra nela faz a commit e faz o pedido.

#### Caso dê algum erro(ou não):

* push request para parear os arquivos local com a master
git push

------------------

* Sai da branch e vai pra master de novo:
git checkout master

* Deleta a branch do local:
git branch -D [branch]

Agora, tudo que precisamos fazer eh por a mao na massa,
        BOA SORTE!

