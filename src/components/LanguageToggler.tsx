import { useState } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GB, NL } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";
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
  Flag: typeof GB;
}

const languages: LanguageOption[] = [
  { code: "en", label: "English", Flag: GB },
  { code: "nl", label: "Nederlands", Flag: NL },
];

const LanguageToggler = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    (i18n.language as Language) || "en"
  );
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find((l) => l.code === selectedLanguage)!;

  const handleLanguageChange = (code: Language) => {
    setSelectedLanguage(code);
    i18n.changeLanguage(code);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center p-2 rounded-lg hover:bg-accent/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <motion.div
            key={currentLanguage.code}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-7 h-5 rounded-sm overflow-hidden shadow-sm ring-1 ring-border/30"
          >
            <currentLanguage.Flag className="w-full h-full" />
          </motion.div>
        </motion.button>
      </DropdownMenuTrigger>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-44 p-1.5 z-[100] bg-popover border border-border shadow-lg rounded-xl overflow-hidden"
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
                    <div className="w-6 h-4 rounded-sm overflow-hidden shadow-sm ring-1 ring-border/30">
                      <language.Flag className="w-full h-full" />
                    </div>
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
