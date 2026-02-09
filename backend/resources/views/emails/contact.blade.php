<!DOCTYPE html>
<html>
<head>
    <title>New Contact Message</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #C49A6C;">New Contact Form Submission</h2>
    <p>You have received a new message from the contact form on your website.</p>
    
    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <p><strong>Name:</strong> {{ $data['name'] }}</p>
        <p><strong>Email:</strong> {{ $data['email'] }}</p>
        <p><strong>Subject:</strong> {{ $data['subject'] }}</p>
        
        <p><strong>Message:</strong></p>
        <div style="background-color: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 3px;">
            {!! nl2br(e($data['message'])) !!}
        </div>
    </div>
    
    <p style="margin-top: 20px; font-size: 12px; color: #888;">
        This email was sent from the contact form on SS Knitwear.
    </p>
</body>
</html>
