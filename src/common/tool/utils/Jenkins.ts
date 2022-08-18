import { Application } from 'src/common/application/models/application.entity';

class Jenkins {
  private application: Application;

  constructor(application: Application) {
    this.application = application;
  }

  public init(): void {
    console.log('jenkins init');
  }
}

export default Jenkins;
