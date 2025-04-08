$headshots = @(
    @{
        url = "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
        filename = "shahir-hassan.jpg"
    },
    @{
        url = "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
        filename = "maya-rodriguez.jpg"
    },
    @{
        url = "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
        filename = "james-wilson.jpg"
    },
    @{
        url = "https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg"
        filename = "sarah-johnson.jpg"
    },
    @{
        url = "https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg"
        filename = "david-park.jpg"
    },
    @{
        url = "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg"
        filename = "olivia-williams.jpg"
    }
)

foreach ($headshot in $headshots) {
    $outputPath = "public/images/team/$($headshot.filename)"
    Write-Host "Downloading $($headshot.url) to $outputPath"
    Invoke-WebRequest -Uri $headshot.url -OutFile $outputPath
} 