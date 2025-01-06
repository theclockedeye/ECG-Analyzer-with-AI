import { motion } from 'framer-motion';
import { ResultsGraph } from '../../components/results/ResultsGraph';

export function Results() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Analysis Results
      </h1>
      <ResultsGraph />
    </motion.div>
  );
}