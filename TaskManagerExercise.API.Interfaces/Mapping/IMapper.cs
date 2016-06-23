namespace TaskManagerExercise.API.Interfaces.Mapping
{
    public interface IMapper
    {
        TResult Map<TSource, TResult>(TSource source);

        TResult Map<TSource, TResult>(TSource source, TResult result);
    }
}