import { Component, OnInit, PipeTransform} from '@angular/core';
import { config, S3 } from 'aws-sdk';
import { Observable, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public imageToShow:string;
  public tableData:Array<Array<string>>;
  public tableHeader:Array<string>;
  public text:string;
  public tableChangeSubject = new Subject<string>();
  
  public filter = new FormControl('');

  constructor() {
  }

  

  ngOnInit(): void {
    // this.getS3('data/2021_07_01/qualification_success_rate_by_region.csv');
    // this.QualifiedSCRegion();
    this.PurchasedDeals();
  }

  public async getS3(key) {
    config.update({
      accessKeyId: "AKIA4J6QPG3CTOIA3V7I",
      secretAccessKey: "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",
      region: "us-east-1"
      }
    );

    let s3 = new S3()
    var getParams = {
      Bucket: 'mca-leadgen-analytical', // your bucket name,
      Key: key // path to the object you're looking for
      }

    try {
      const data = await s3.getObject(getParams).promise();
      return data.Body.toString('utf-8');
    } catch (e) {
      console.log("error loading from S3");
      throw new Error(`Could not retrieve file from S3: ${e.message}`);
    }

  }
  public getTableChangedEvent(): Observable<string> {
    return this.tableChangeSubject.asObservable();
  }
 
  public OverallDateDistribution():void {
    this.setText("overall date distribution")
    this.setImage("https://mca-leadgen-analytical.s3.amazonaws.com/plots/2021_07_01/overall_date_distribution.png")
    this.getS3('data/2021_07_01/overall_date_distribution.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }

  public QualifiedSCDate():void {
    this.setText("qualification success rate by date")
    this.setImage("https://mca-leadgen-analytical.s3.amazonaws.com/plots/2021_07_01/qualification_success_rate_by_date.png")
    this.getS3('data/2021_07_01/qualification_success_rate_by_date.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }

  public QualifiedSCRegion():void {
    this.setText("qualification success rate by region");
    this.setImage("https://mca-leadgen-analytical.s3.amazonaws.com/plots/2021_07_01/qualification_success_rate_by_region.png")
    this.getS3('data/2021_07_01/qualification_success_rate_by_region.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }

  public QualifiedSCSource():void {
    this.setText("qualification success rate by source");
    this.setImage("https://mca-leadgen-analytical.s3.amazonaws.com/plots/2021_07_01/qualification_success_rate_by_source.png")
    this.getS3('data/2021_07_01/qualification_success_rate_by_source.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }

  public DistributionOfDealsOverCRMPipelines():void {
    this.setText("distribution of deals over crm pipelines");
    this.setImage("https://mca-leadgen-analytical.s3.amazonaws.com/plots/2021_07_01/distribution_of_deals_over_crm_pipelines.png");
    this.getS3('data/2021_07_01/distribution_of_deals_over_crm_pipelines.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }

  public StatusTrend():void {
    this.setText("trend on stauts");
    this.setImage("https://mca-leadgen-analytical.s3.amazonaws.com/plots/2021_07_01/status_trend.png");
    this.getS3('data/2021_07_01/status_trend.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }
  
  public RegionTrend():void {
    this.setText("trend on regions");
    this.setImage("https://mca-leadgen-analytical.s3.amazonaws.com/plots/2021_07_01/region_trend.png");
    this.getS3('data/2021_07_01/region_trend.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }

  public SourceTrend():void {
    this.setText("trend on regions");
    this.setImage("https://mca-leadgen-analytical.s3.amazonaws.com/plots/2021_07_01/source_trend.png");
    this.getS3('data/2021_07_01/source_trend.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }

  public MsgSCDate(): void {
    this.setText("message success rate by date");
    this.setImage("https://mca-leadgen-analytical.s3.amazonaws.com/plots/2021_07_01/message_success_rate_by_date.png");
    this.getS3('data/2021_07_01/message_success_rate_by_date.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }

  public MsgSCSource(): void {
    this.setText("message success rate by date");
    this.setImage("https://mca-leadgen-analytical.s3.amazonaws.com/plots/2021_07_01/message_success_rate_by_source.png");
    this.getS3('data/2021_07_01/message_success_rate_by_source1.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }

  public MsgSCRegion(): void {
    this.setText("message success rate by date");
    this.setImage("https://mca-leadgen-analytical.s3.amazonaws.com/plots/2021_07_01/message_success_rate_by_region.png");
    this.getS3('data/2021_07_01/message_success_rate_by_region1.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }
  
  public BuyingProgramPipeline(): void {
    this.setText("distribution of deals over CRM pipelines");
    this.setImage("https://mca-leadgen-analytical.s3.amazonaws.com/plots/2021_07_01/distribution_of_deals_over_crm_pipelines.png");
    this.getS3('data/2021_07_01/distribution_of_deals_over_crm_pipelines.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }

  public BuyingProgramStage(): void {
    this.setText("distribution of deals over stage");
    this.setImage("https://mca-leadgen-analytical.s3.amazonaws.com/plots/2021_07_01/distribution_of_deals_over_stages.png");
    this.getS3('data/2021_07_01/distribution_of_deals_over_stages.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }

  public BuyingProgramReason(): void {
    this.setText("distribution of deals over stage");
    this.setImage("https://mca-leadgen-analytical.s3.amazonaws.com/plots/2021_07_01/distribution_of_deals_over_reasons.png");
    this.getS3('data/2021_07_01/distribution_of_deals_over_reasons.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }

  public PurchasedDeals(): void {
    this.setText("Purchased Deals");
    this.setImage("");
    this.getS3('data/2021_07_01/purchased_deals_df.csv').then((data)=>{
      this.setHeader(this.getHeader(data));
      this.setTable(this.decodeCSV(data));
    });
  }


  public setImage(imageUrl:string):void {
    this.imageToShow=imageUrl;
  }
  public setText(text:string):void {
    this.text=text;
  }

  public setHeader(tableHeader:Array<string>):void {
    this.tableHeader=tableHeader;
    console.log(this.tableHeader)
  }

  public setTable(tableData:Array<Array<string>>):void {
    this.tableData=tableData;
  }
  public decodeCSV(inputString:string):Array<Array<string>> {
    inputString = inputString.trim()
    var lines=inputString.split('\n');
    var tableData=[];
    for (let i=1; i<lines.length;i++) {
      tableData.push(lines[i].trim().split(','));
    }
    return tableData;
  }
  public getHeader(inputString:string):Array<string> {

    inputString = inputString.trim()
    var lines=inputString.split('\n');
    var tableHeader=[];
    tableHeader = lines[0].trim().split(',');
    return tableHeader
  }




}
