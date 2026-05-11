import numpy as np

class MedicalGA:
    def __init__(self, items, weight_limit, volume_limit):
        self.items = items
        self.weight_limit = weight_limit
        self.volume_limit = volume_limit
        self.pop_size = 50
        self.genes = len(items)

    def calculate_fitness(self, chromosome):
        # Pick items where chromosome bit is 1
        selected = self.items.iloc[chromosome == 1]
        
        tw = selected['Weight (kg)'].sum()
        tv = selected['Volume (L)'].sum()
        
        if tw > self.weight_limit or tv > self.volume_limit:
            return 0 # Invalid load
        
        # Formula: Priority * Demand * Expiry (Normalized)
        score = (selected['Priority'] * selected['DemandScore'] * (selected['ExpiryDays']/365)).sum()
        return score

    def solve(self, generations=100):
        # Initial Population
        pop = np.random.randint(2, size=(self.pop_size, self.genes))
        
        for _ in range(generations):
            # Sort by fitness
            scores = np.array([self.calculate_fitness(ind) for ind in pop])
            pop = pop[np.argsort(scores)[-self.pop_size:]]
            
            # Crossover (Mixing parents)
            for i in range(0, self.pop_size // 2):
                if np.random.rand() < 0.7:
                    cp = np.random.randint(1, self.genes)
                    pop[i, cp:], pop[i+1, cp:] = pop[i+1, cp:].copy(), pop[i, cp:].copy()
            
            # Mutation (Random changes)
            if np.random.rand() < 0.2:
                idx = np.random.randint(self.pop_size)
                bit = np.random.randint(self.genes)
                pop[idx, bit] = 1 - pop[idx, bit]
                
        return pop[-1] # Return best chromosome