$testimonials = @(
    @{
        url = "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg"
        filename = "sarah-testimonial.jpg"
    },
    @{
        url = "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg"
        filename = "michaela-testimonial.jpg"
    },
    @{
        url = "https://images.pexels.com/photos/5490367/pexels-photo-5490367.jpeg"
        filename = "emily-testimonial.jpg"
    },
    @{
        url = "https://images.pexels.com/photos/5490228/pexels-photo-5490228.jpeg"
        filename = "david-testimonial.jpg"
    }
)

# Create testimonials directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "public/images/testimonials"

foreach ($testimonial in $testimonials) {
    $outputPath = "public/images/testimonials/$($testimonial.filename)"
    Write-Host "Downloading $($testimonial.url) to $outputPath"
    Invoke-WebRequest -Uri $testimonial.url -OutFile $outputPath
} 