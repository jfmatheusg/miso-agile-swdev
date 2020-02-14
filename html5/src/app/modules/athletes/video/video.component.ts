import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from 'src/app/services/title.service';
import { AthletesService } from 'src/app/services/athletes.service';
import { environment } from 'src/environments/environment';
import { ErrorRestInterface } from 'src/app/interfaces/error-rest.interface';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html'
})
export class VideoComponent implements OnInit {
  errorRest: ErrorRestInterface;
  environment = environment;
  isLoadingResultsA = true;
  event: any;

  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


  constructor(
    private athletesService: AthletesService,
    private titleService: TitleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let pk = this.route.snapshot.params.pk;
    this.athletesService.getEvent(pk).subscribe(event => {
      this.isLoadingResultsA = false;
      this.event = event;
      this.titleService.setTitle(`${event.athlete['first_name']} ${event.athlete['last_name']}`);
      let url_object = new URL(event.url_video);
      this.video = url_object.searchParams.get('v');
      this.putScript();
    }, error => {
      this.errorRest = error.error;
    });
  }

  // Acá va la implementación de la libreria por angular
  putScript() {
    if (window['YT']) {
      this.startVideo();
      return;
    }
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => this.startVideo();

  }

  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      height: '360',
      width: '100%',
      videoId: this.video,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1

      },
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });
  }

  onPlayerReady(event) {
    if (this.isRestricted) {
      event.target.mute();
      event.target.playVideo();
    } else {
      event.target.playVideo();
    }
  }

  onPlayerStateChange(event) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('Inicio ' + this.cleanTime());
        } else {
          console.log('Reproduciendo ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('Pausa' + ' @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('Fin ');
        break;
    };
  };

  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };
}
