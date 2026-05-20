import { motion, AnimatePresence } from "framer-motion";

export interface ToastMessage {
  id: string;
  title: string;
  body?: string;
}

export function ToastStack({ messages }: { messages: ToastMessage[] }) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="w-80 rounded-lg border border-line bg-white/90 p-3 shadow-matte backdrop-blur"
          >
            <div className="text-sm font-semibold">{message.title}</div>
            {message.body ? <div className="mt-1 text-sm text-stone-600">{message.body}</div> : null}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
