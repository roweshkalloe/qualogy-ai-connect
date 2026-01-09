import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = "en" | "nl";

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
];

const LanguageToggler = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find((l) => l.code === selectedLanguage)!;

  const handleLanguageChange = (code: Language) => {
    setSelectedLanguage(code);
    // Future: Add i18n integration here
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/50 hover:bg-accent border border-border/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <motion.span
            key={currentLanguage.flag}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-lg leading-none"
          >
            {currentLanguage.flag}
          </motion.span>
          <span className="text-sm font-medium text-foreground hidden sm:inline">
            {currentLanguage.code.toUpperCase()}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </motion.div>
        </motion.button>
      </DropdownMenuTrigger>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-44 p-1.5 z-[100] bg-background border border-border shadow-lg rounded-xl overflow-hidden"
            asChild
          >
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                    selectedLanguage === language.code
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg leading-none">{language.flag}</span>
                    <span className="text-sm font-medium">{language.label}</span>
                  </div>
                  {selectedLanguage === language.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <Check className="w-4 h-4 text-primary" />
                    </motion.div>
                  )}
                </DropdownMenuItem>
              ))}
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
    </DropdownMenu>
  );
};

export default LanguageToggler;
