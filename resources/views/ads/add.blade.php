@extends('layouts.app')

@section('top')
    <a href="{{ route('admin.ads') }}" class="btn btn-danger">Cancel</a>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-body pb0">
                    {!! Form::open(['id' => 'new-ad-form']) !!}
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Title:</label>
                            <div class="col-md-11 col-sm-10">
                                {!! Form::text('title', null, ['class' => 'form-control']) !!}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Content:</label>
                            <div class="col-md-11 col-sm-10">
                                {!! Form::textarea('content', null, ['class' => 'form-control']) !!}
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-md-1 col-sm-2 control-label">Contact Email:</label>
                            <div class="col-md-11 col-sm-10">
                                {!! Form::email('email', null, ['class' => 'form-control']) !!}
                            </div>
                        </div>
                    </fieldset>
                    <div class="col-sm-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <div class="panel-title">Ad Image</div>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-sm-12 mb">
                                        <a id="ad_image_handler" data-input="image"
                                           data-preview="ad_image_preview">
                                            <div class="featured-image-box featured-image-box-200h">
                                                <img class="featured-image" alt="Choose Ad Image"
                                                     id="ad_image_preview">
                                            </div>
                                        </a>
                                        <input type="hidden" name="image" id="image">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group text-right">
                        <div class="col-md-12">
                            <input type="submit" class="btn btn-success"/>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    {!! Form::close() !!}
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
<script>
    jQuery(function ($) {
        $main_form = $('#new-ad-form');
        $main_form.submit(function () {

            $.notify(window.custom.messages.processing);

            $.ajax({
                url: '{{ route('ads.store') }}',
                type: 'POST',
                dataType: 'JSON',
                data: $main_form.serializeArray(),
                success: function (data) {
                    $.notify.closeAll();
                    $.notify(data);
                },
                error: function (e) {
                    $.notify.closeAll();
                    $.notify(window.custom.messages.internal_error);
                }
            });

            return false;
        });

        $('#ad_image_handler').filemanager('image');
    });
</script>
@endpush