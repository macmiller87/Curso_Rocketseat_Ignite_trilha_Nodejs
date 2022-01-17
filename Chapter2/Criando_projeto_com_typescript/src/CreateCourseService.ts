interface Course { // Aqui está sendo usado o método (interface) para poder fazer a desestruturação dos atributos na classe CreateCourseService().

    name: string; 
    duration?: number; //aqui está seno usado o ponto de (?), que torna esse atributo opcional ou não, ou seja pode ser passado ou não, que não vai dar problema.
    educator: string

}


class CreateCourseService { // Aqui foi declarada a classe com seus parametros.
    execute({name, duration = 8, educator}: Course) { // Aqui está sendo passado o Course, que é uma variavel qualquer, que está sendo declarado no (método interface) acima ... tanbém está sendo usado o default, no parametro (duration), que se caso não receba um valor na chamada do objeto pela função (CreateCourseService) no arquivo routes.ts, então seu valor será igual a (8).

        console.log(name, duration, educator);
    }
}

export default new CreateCourseService(); // Aqui está sendo exportado a função com o comando (default new), para poder ser usado no arquivo (routes.ts).