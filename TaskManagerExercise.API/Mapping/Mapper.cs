using TaskManagerExercise.API.Interfaces.Mapping;

namespace TaskManagerExercise.API.Mapping
{
    public class Mapper : IMapper
    {
        public TResult Map<TSource, TResult>(TSource source)
        {
            return AutoMapper.Mapper.Map<TSource, TResult>(source);
        }

        public TResult Map<TSource, TResult>(TSource source, TResult destination)
        {
            return AutoMapper.Mapper.Map<TSource, TResult>(source, destination);
        }
    }
}