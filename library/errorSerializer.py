from rest_framework import serializers

def get_custom_error_message(field, error):
        messages = {
            'blank': f"Le champ {field} ne peut pas être vide.",
            'required': f"Le champ {field} est requis.",
            'invalid': f"Le champ {field} est invalide.",
            'unique': f"{field.capitalize()} doit être unique."
        }
        return messages.get(error.code, error)

def custom_to_internal_value(serializer_instance, data):
    errors = {}
    try:
        validated_data = super(serializer_instance.__class__, serializer_instance).to_internal_value(data)
    except serializers.ValidationError as exc:
        errors = exc.detail

    customized_errors = {}
    for field, error_list in errors.items():
        customized_errors[field] = [get_custom_error_message(field, error) for error in error_list]

    if customized_errors:
        raise serializers.ValidationError(customized_errors)

    return validated_data