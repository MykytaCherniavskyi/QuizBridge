import { useState } from 'react';
import { useGetPokemonByNameQuery } from '@/state/pokemon-api.slice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export function PokemonPage() {
  const [pokemonName, setPokemonName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: pokemon,
    error,
    isLoading,
  } = useGetPokemonByNameQuery(searchTerm, {
    skip: !searchTerm,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(pokemonName.toLowerCase());
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <Input
          type="text"
          value={pokemonName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPokemonName(e.target.value)}
          placeholder="Enter Pokemon name..."
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </form>

      {isLoading && <p>Loading...</p>}

      {error && (
        <p className="text-red-500">
          Error: {error instanceof Error ? error.message : 'Failed to fetch Pokemon'}
        </p>
      )}

      {pokemon && (
        <Card className="p-4">
          <h2 className="mb-2 text-xl font-bold capitalize">{pokemon.name}</h2>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="mx-auto h-32 w-32"
          />
          <div className="mt-4">
            <p>Height: {pokemon.height / 10}m</p>
            <p>Weight: {pokemon.weight / 10}kg</p>
            <div className="mt-2">
              <p className="font-semibold">Types:</p>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="rounded bg-primary px-2 py-1 text-sm text-primary-foreground"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
