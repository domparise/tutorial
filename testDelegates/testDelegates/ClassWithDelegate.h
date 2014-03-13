//
//  Custom.h
//  testDelegates
//
//  Created by Dom on 2/28/14.
//  Copyright (c) 2014 dolodev llc. All rights reserved.
//

// define the protocol for the delegate
@protocol ClassWithDelegateDelegate

// define protocol functions that can be used in any class using this delegate
-(void)delegatedResponse;

@end

@interface ClassWithDelegate : NSObject {
    
}
// define delegate property
@property (nonatomic, assign) id  delegate;
-(id)initWithDelegate:(id)delegate;

// define public functions
-(void)messageToClass;

@end