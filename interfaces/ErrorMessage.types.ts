export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  visible: boolean;
  onDismiss: () => void;
}
